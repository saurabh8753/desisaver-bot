import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const buttons = {
  inline_keyboard: [
    [
      {
        text: "🚀 Open Downloader",
        url: "https://desisavar.pages.dev/",
        web_app: null
      }
    ],
    [
      {
        text: "📢 Update Channel",
        url: "https://t.me/+gAJMvxd5z102YjE1"
      }
    ]
  ]
};

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: buttons
    })
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const update = req.body;

  const message =
    update.message ||
    update.callback_query?.message;

  if (!message) {
    return res.status(200).end();
  }

  const chatId = message.chat.id;

  await sendMessage(
    chatId,
    "👇 Niche button se downloader open kare:"
  );

  res.status(200).end();
}
