var postmark = require('postmark')(process.env.POSTMARK_API_TOKEN);

module.exports = {
  paymentConfirmed: function(pledge) {
    var message = `Tack så mycket!<br />
Din betalning är nu mottagen och bekräftad. <br />
<br />
Du kan nu lugnt njuta av livet tills nästa mail kommer, det blir nämligen inbjudan till festen! Stay tuned!<br />
<br />
/iMax & Horv PREMIUM`;
    return this.send(pledge.email, "Canvastavlan - Betalning bekräftad", message);
  },
  payment: function(pledge) {
    var message =
`Hej!<br />

tl;dr: Betala via Swish, deadline om en vecka. <strong>Koden</strong> i meddelandet <strong>identifierar dig</strong>. Maila om du vill betala på något annat sätt. Du får bekräftelse på betalning<br />
<br />
Först och främst vill jag tacka för att du vill vara med och stötta projektet, det är helt otroligt att vi tillsammans samlar in över 3000 kr!<br />
Nu till det praktiska:<br />
<br />
Du har valt att bidra med ${pledge.amount} kr, helst tar jag emot bidraget via Swish.<br />
Deadline för betalningen är vid midnatt söndag kväll <strong>den 15 maj</strong> (natten sön-mån). De som har fått sin betalning bekräftad eller har kommit överens med mig personligen vid det tillfället, är med.
<br />
Swisha till <strong>XXX-XXXXXX</strong><br />
Belopp: <strong>${pledge.amount}</strong><br />
Meddelande: <strong>${pledge.paymentToken}</strong><br />
<br />
Det går bra att swisha genom en kompis, så länge som meddelandet hänger med, det är unikt för ditt bidrag.<br />
Vill du betala på något annat sätt (traditionell banköverföring eller cash) så <strong>kontakta mig</strong> så löser vi det.<br />
När jag har tagit emot betalningen så får du ett automatiskt mail, och ditt namn kommer med på plaketten.
`;
    this.send(pledge.email, "Canvastavlan - Betalningsdetaljer", message);
  },
  confirmation: function(pending) {
    var pledge = pending.pledge;
    var message = "Hej!<br /> Tack för att du vill vara med och bidra till canvastavlan. Klicka på länken nedan för att verifiera ditt bidrag och göra det bindande, först en sammanfattning av bidraget: <br /><br />"+
    "Bidrag: "+ pledge.amount +" kr<br />"+
    "Nick: "+ (pledge.anonymous ? "&lt;anonym&gt;" : pledge.nick) +"<br /><br />"+
    "Bekräftelselänk: <a href=\"https://horvtavla.herokuapp.com/#/confirm/"+ pending.token + "\">https://horvtavla.herokuapp.com/confirm</a><br /><br />"+
    "Om du har ångrat dig eller detaljerna är fel så kan du kasta detta mailet, gå tillbaka till websidan och registrera igen. Om du vill ändra ett bekräftat bidrag registrerar du igen, men var noga med att använda samma mailadress som tidigare (då skrivs ditt förra bidrag över).<br /><br />Tack än en gång!<br />iMax & Horv PREMIUM";

    this.send(pending.email, "Canvastavlan - Bekräfta ditt bidrag", message);
  },
  send: function(to, subject, content) {
    return new Promise(function(fulfill, reject) {
      postmark.send({
        "From": "iMax <email@example.com>",
        "To": to,
        "Subject": subject,
        "HtmlBody": content
      }, function(error, success) {
        if(error){
          console.error("Unable to send via postmark: ", error.message);
          reject(error.message);
        } else {
          console.log("Email sent:", subject);
          fulfill();
        }
      });
    })
  },
  mockSend: function(to, subject, content) {
    console.log(
`To: ${to}
Content:
${content}
`);
  }
}
