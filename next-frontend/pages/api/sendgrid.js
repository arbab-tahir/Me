import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "arbabtahir2244@gmail.com", // Your email where you'll receive emails
      from: "arbabtahir2244@gmail.com", // your website email address here
      subject: `[Lead from website] : ${req.body.message}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>Mail From Site</title>
        <meta name="description" content="Mail From Site">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${req.body.name}, their email is: 📧 ${req.body.email} </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${req.body.message}</p>
              <br>
              </div>
              <img src="https://drive.google.com/file/d/1LOKf6KnDzkWfVWRJvt13JOkdjN0on0fr/view?usp=share_link" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Arbab Tahir<br>Software Developer<br>+92 3154270821</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
              <a href="https://twitter.com/marbabtahir" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
              <a href="https://www.linkedin.com/in/marbabtahir/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
              <a href="https://github.com/arbab-tahir" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
              
              </div>
              </div>
              </body>
              </html>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;

// <a href="https://manuarora.in/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
// <a href="https://manuarora.in/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
