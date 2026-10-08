import { NextResponse } from "next/server";

type Body = {
  doctorId: number;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    if (!body.doctorId || !body.patientName || !body.patientPhone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `Yangi qabul:\nShifokor: ${body.doctorName}\nBemor: ${body.patientName}\nTel: ${body.patientPhone}\nSana: ${body.date} ${body.time}`;

    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
