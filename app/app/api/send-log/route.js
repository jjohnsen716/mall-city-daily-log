import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  const data = await request.json();

  const message = `
Daily Job Log – Mall City Mechanical

Date: ${data.date}
Job: ${data.job}
Foreman: ${data.foreman}
Crew Size: ${data.crew}

Work Performed:
${data.work}

Issues / Delays:
${data.issues}

Safety Notes:
${data.safety}
`;

  try {
    await sgMail.send({
      to: [
        "jjohnsen@mcm-team.com",
        "dailylogs@mcm-team.com"
      ],
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Daily Log – ${data.job} – ${data.date}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
