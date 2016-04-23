var postmark = require('postmark')(process.env.POSTMARK_API_TOKEN);

module.exports = {
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
    postmark.send({
      "From": "iMax <imax@chalmers.it>",
      "To": to,
      "Subject": subject,
      "HtmlBody": content
    }, function(error, success) {
      if(error){
        console.error("Unable to send via postmark: ", error.message);
        return;
      }
    });
  }
}
