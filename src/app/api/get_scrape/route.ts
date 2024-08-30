import puppeteer from "puppeteer";
import { NextRequest } from "next/server";

const getType = (base: string) => {
  const type = {
    Ação: "acoes",
    FII: "fundos-imobiliarios",
    BDR: "bdrs",
  };
  return type[base as keyof typeof type];
};

// Função utilitária para pausar a execução por um determinado tempo
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url);
    const param_type = searchParams.searchParams.get("type");
    const param_alias = searchParams.searchParams.get("fund_alias");

    const type = getType(param_type!);
    const fund_alias = param_alias?.toLocaleLowerCase();

    // Inicializa o navegador Puppeteer com opções adicionais
    const browser = await puppeteer.launch({
      headless: true, // Executa o navegador em modo visual (não headless)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=128,128", // Define o tamanho da janela
      ],
    });

    const page = await browser.newPage();

    // Define um User-Agent comum de navegador
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    );

    // Configurações adicionais para simular um navegador real
    // await page.setExtraHTTPHeaders({
    //   "accept-language": "en-US,en;q=0.9",
    // });

    await page.setViewport({ width: 128, height: 128 }); // Define o tamanho do viewport na janela

    // Acessa a página alvo e espera pela carga completa
    await page.goto(`https://statusinvest.com.br/${type}/${fund_alias}`, {
      waitUntil: "domcontentloaded", // Espera até que o conteúdo da página tenha carregado
      // waitUntil: "networkidle2", // Espera até que a página tenha carregado completamente
    });

    // Executa uma interação para parecer mais "humano"
    // await sleep(200); // Espera 0.2 segundos para simular um comportamento humano
    // await page.mouse.move(100, 100); // Move o mouse para evitar detecção de bots

    // Extrai o valor da cota, contido na tag <strong> com a classe "value" dentro de um <div> com a classe "d-md-inline-block"
    const value = await page.evaluate(() => {
      const element = document.querySelector(".d-md-inline-block .value");
      return element?.textContent?.trim() ?? null;
    });

    // Extrai a variação, contida na tag <strong> com a classe "v-align-middle" dentro de um <span> com o título específico
    const valueGrowth = await page.evaluate(() => {
      const element1 = document.querySelector(
        "span[title*='Variação do valor do ativo com base no dia anterior'] i"
      );
      const element2 = document.querySelector(
        "span[title*='Variação do valor do ativo com base no dia anterior'] .v-align-middle"
      );
      const value1 = element1?.textContent?.trim();
      const text1 = value1 === "arrow_upward" ? "+" : value1 === "arrow_downward" ? "-" : "";
      const text2 = element2?.textContent?.trim();
      return text1 + text2 ?? null;
    });

    // Extrai o dividend yeld, contido na tag <strong> com a classe "value" dentro de um <div> com o título específico
    const dy = await page.evaluate(() => {
      const element = document.querySelector(
        'div[title*="Dividend Yield com base nos últimos 12 meses"] .value'
      );
      return element?.textContent?.trim() ?? null;
    });

    // Extrai a valorização, contida na tag <strong> com a classe "value" dentro de um <div> com o título específico
    const growth = await page.evaluate(() => {
      const element1 = document.querySelector(
        'div[title*="Valorização no preço do ativo com base nos últimos 12 meses"] i'
      );
      const element2 = document.querySelector(
        'div[title*="Valorização no preço do ativo com base nos últimos 12 meses"] .value'
      );
      const value1 = element1?.textContent?.trim();
      const text1 = value1 === "arrow_upward" ? "+" : value1 === "arrow_downward" ? "-" : "";
      const text2 = element2?.textContent?.trim();
      return text1 + text2 ?? null;
    });

    // Extrai o pvp, contido na segunda tag <strong> com a classe "value" dentro do <div> com as classes especificadas
    const pvp = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        "div.top-info.top-info-2.top-info-md-3.top-info-lg-n.d-flex.justify-between .value"
      );
      return elements.length > 1 ? elements[1]?.textContent?.trim() : null;
    });

    // Fecha o navegador
    await browser.close();

    // Retorna o resultado para o frontend
    return new Response(JSON.stringify({ value, valueGrowth, dy, growth, pvp }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao fazer scraping:", error);
    return new Response(JSON.stringify({ message: "Erro ao buscar os dados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
