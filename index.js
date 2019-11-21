const Proxy = require('@abai/proxy');
const express = require('express');
const app = express();
let config;
try {
  config = require('./config.json')
} catch (e) {
  config = { prefix: 'get', mainPagePath: '/index.html', notFoundPagePath: '/404.html', ratelimit: {
    windowMs: 1000,
    max: 50,
    message: 'Global ratelimit reached.'
  }};
}

app.enable('trust proxy', true);
app.set('view cache', true);

app.use(require('cors')());
app.use(require('helmet')({
  frameguard: false
}));
app.use(require('compression')());
app.use(require('express-rate-limit')(config.ratelimit));

const add = (html) => {
  const script = [
    `<link href='https://fonts.googleapis.com/css?family=Roboto&display=swap' rel='stylesheet'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
<style>
.muun-style-logo { =animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1); } .muun-style-box { align-self: flex-end; animation-duration: 2s; animation-iteration-count: infinite; transform-origin: bottom; } @keyframes bounce { 0% { transform: scale(1,1) translateY(0); } 10% { transform: scale(1.1,.9) translateY(0); } 30% { transform: scale(.9,1.1) translateY(-30px); } 50% { transform: scale(1.05,.95) translateY(0); } 57% { transform: scale(1,1) translateY(-2px); } 64% { transform: scale(1,1) translateY(0); } 100% { transform: scale(1,1) translateY(0); } }
</style>
    <!--<img onclick='$('.muun-style-logo').css({ 'animation-name': 'bounce', 'animation-duration': '2s' }); class='muun-style-logo muun-style-box' id='muun-style-poweredby' src='https://cdn.glitch.com/8771f27e-b88e-49f0-84b0-728655e59a31%2Fm.png?v=1565288565257' style='width:60px !important;right:10px;bottom:10px;position:fixed; pointer-events: none; max-width: 15%;z-index:9999999999; border-radius:4px;padding:9px; color:#fff !important; font-size:15px; padding-left: 18px;padding-right: 18px;font-family: ' roboto',='' monospace='' !important;='' line-height:='' initial;='' width:auto;'=''>-->
    <div id='muun-style-poweredby' style='background: #2DB194;box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);right:10px;bottom:10px;position:fixed; pointer-events: none; max-width: 15%;z-index:9999999999; border-radius:4px;padding:9px; opacity:0.75; color:#fff !important; font-size:15px; padding-left: 18px;padding-right: 18px;font-family: ' roboto',='' monospace='' !important;='' line-height:='' initial;='' width:auto;'=''>Powered By <b>Muun</b></div>
    <p style='display: none;color: transparent !important; z-index: -1 !important; position: fixed !important;pointer-events: none;'>Interesting: Hillary Clinton has been telling America that she is the most qualified candidate for president based on her 'record,' which she says includes her eight years in the White House as First Lady - or 'co-president' - and her seven years in the Senate. Here is a reminder of what that record includes: - As First Lady, Hillary assumed authority over Health Care Reform, a process that cost the taxpayers over $13 million. She told both Bill Bradley and Patrick Moynihan, key votes needed to pass her legislation, that she would 'demonize' anyone who opposed it. But it was opposed; she couldn't even get it to a vote in a Congress controlled by her own party. (And in the next election, her party lost control of both the House and Senate.) - Hillary assumed authority over selecting a female Attorney General. Her first two recommendations, Zoe Baird and Kimba Wood, were forced to withdraw their names from consideration. She then chose Janet Reno. Janet Reno has since been described by Bill himself as 'my worst mistake.' - Hillary recommended Lani Guanier for head of the Civil Rights Commission. When Guanier's radical views became known, her name had to be withdrawn. - Hillary recommended her former law partners, Web Hubbell, Vince Foster, and William Kennedy for positions in the Justice Department, White House staff, and the Treasury, respectively. Hubbell was later imprisoned, Foster committed suicide, and Kennedy was forced to resign. - Hillary also recommended a close friend of the Clintons, Craig Livingstone, for the position of director of White House security. When Livingstone was investigated for the improper access of up to 900 FBI files of Clinton enemies (?Filegate?) and the widespread use of drugs by White House staff, both Hillary and her husband denied knowing him. (CNN)The silence from most of the world's capitals since US President Donald Trump posted racist tweets over the weekend has been almost deafening. This is just the latest example of Trump lowering global standards and raising the temperature on a universally divisive issue that is already at risk of overheating. And it's affecting how the rest of the world interacts with the US. Last week Kim Darroch, the UK's ambassador to Washington, quit the most prestigious overseas post in the country's diplomatic service after Trump tweeted that he would no longer talk to him. It seems, however, that such rejection operates on a one-way basis. When world leaders don't like Trump's attitude, they have to suck it up. His tweets, telling four Democratic Congresswomen to in essence to go back home, even though for them home is the United States, were unambiguously racist. Democrats are angered; Republicans oddly silent. After two-and-a-half years, Americans are more than used to Trump's proclivity for trampling on even the most basic of human dignities. And while not there yet, the rest of the world seems to be going that way. And that doesn't bode well for anyone. Donald Trump&#39;s racist tweets show he doesn&#39;t understand America Donald Trump's racist tweets show he doesn't understand America Darroch had been doing his job, informing London on his assessment of Trump's White House. He called it 'inept,' 'dysfunctional,' and even accused the President of 'diplomatic vandalism' when he pulled out of the Iran nuclear deal. None of that thinking was exclusive to Darroch. Plenty of other diplomats working for other countries had come to similar conclusion and told their capitals much the same. Darroch's misfortune was to have his private cables leaked. The subtext to his rapid departure had more to do with domestic politics in the UK that DC chicanery. But the clear lesson from the Darroch affair was this: Question Trump publicly at your and your nation's peril. Outgoing British Prime Minister Theresa May's lone voice piping up Monday morning is almost the exception that proves the rule of international acquiescence. She lambasted the language of Trump's Tweets as 'completely unacceptable.' But then, she is out of her job next week. Therein lies the clue to Trump's ability to trample the sensitivities of all nations simultaneously. No leader with a vested interest in a lasting relationship with arguably the most powerful man in the world wants to risk his wrath. Listen to Angela Merekl, German Chancellor and Europe's moral compass, mealy mouth her way out of criticizing Trump who has consistently hammered her on any number of issues, 'The president has his opinions, I have mine, and very often, we also find common ground. If not, we have to keep on talking and negotiating.' Play Video Merkel: Trump has his opinions, I have mine 01:02 Or how about Jean-Claude Junker, the outgoing European Commission President, whose EU project Trump bashes with sustained contempt. 'He says I am his friend, so I have to say I am his frien... And he publicly said that he loves me. Whoever made a declaration of that kind other than Donald?' The reality for everyone but Trump is that there are greater issues at stake, so silence on what should be a no-brain outrage gets subjugated to national interests. May's much anticipated, but yet to be anointed replacement, former foreign secretary Boris Johnson has already announced a trip to DC to meet Trump will be a priority, assuming he wins his party's leadership contest and is sworn in as PM next week. It would be bold move on his part to condemn Trump's racist language on the eve of rekindling what Brits still believe is the 'special relationship' between the two nations. President Emmanuel Macron tried to have an honest two-way bromance with Trump, but found to his cost it was one way. Macron's overtures to the US President on climate change were rejected, despite rolling out a red carpet reception in Paris for Trump at the annual July 14th celebrations plus a meal up the Eifel Tower. The global consensus seems to be that honey, and certainly not vinegar, has no positive lasting impact on relations with Trump. Saudi Arabia does well with Trump, laying on the bling when he visited on his first overseas trip 2017. Their relationship remains sweet because of billions of dollars in arms sales and keeping out of each others' interests. Trump pointedly not criticising the desert Kingdom's Crown Prince over the murder of Saudi journalist Jamal Khashoggi; the Saudis with little to say on Trump's early verbal assaults on Muslim migrants. How news outlets are dealing with the &#39;moral dimension&#39; of covering Trump and his racist tweets How news outlets are dealing with the 'moral dimension' of covering Trump and his racist tweets The Saudis handle China much the same way, apparently unquestioningly supporting their questionable Uighur minority 're-education' program, which has led to more than a million Muslim's in China being locked up in a secret detention facilities. Trump's lesson to the world is mind your own business, which on a less integrated planet, might just about work. But for the global village and connected world we inhabit, it's likely to have long-term, serious repercussions. Even if many in the US have grown used to Trump being Trump and have found their own coping mechanisms, the rest of the civilized world has not. Long after he is gone, his legacy will still be felt, particularly among the nations he impugns. Silence from leaders, even if they deem it in their immediate national interest, is only a band aid for the wounds he is opening. To stitch up the wounds of Trump's America's fragmenting diplomacy will require serious surgery.</p>
      <script>
      function generateToken(n) {
          var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
          var token = '';
          for(var i = 0; i < n; i++) {
              token += chars[Math.floor(Math.random() * chars.length)];
          }
          return token;
      }
      var link = document.querySelector('link[rel*='icon']') || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = 'https://cdn.glitch.com/8771f27e-b88e-49f0-84b0-728655e59a31%2Fm.png?v=1565288565257';
      document.title='muun-session-' + generateToken(32);
      document.getElementsByTagName('head')[0].appendChild(link);
      document.getElementsByTagName('head')[0].appendChild(link);
    </script>`
    ].join('\
');
  html = html.replace('</body>', `\
<!-- INSERTED BY MUUN -->
  ${script}
  <!-- INSERTED BY MUUN -->\
</body>`);
  return html;
}

const middleware = (data) => {
  if (data.contentType == 'text/html') {
    data.stream = data.stream.pipe(new require('stream').Transform({
      decodeStrings: false,
      transform: function(chunk, encoding, next) {
        this.push(add(chunk.toString()));
        next();
      }
    }));
  }
}

function generateToken(n = Math.floor(Math.random() * (200 - 100 + 1) + 100)) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for(var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

const token = [ generateToken(), generateToken(), generateToken(), generateToken(), generateToken() ];
app.use(new Proxy({ prefix: `/${token[0]}/`, responseMiddleware: [ middleware ]}));
app.use(new Proxy({ prefix: `/${token[1]}/`, responseMiddleware: [ middleware ]}));
app.use(new Proxy({ prefix: `/${token[2]}/`, responseMiddleware: [ middleware ]}));
app.use(new Proxy({ prefix: `/${token[3]}/`, responseMiddleware: [ middleware ]}));
app.use(new Proxy({ prefix: `/${token[4]}/`, responseMiddleware: [ middleware ]}));

app.get(`/${config.prefix}`, (req, res) => {
  let url = req.protocol + '://' + req.get('host') + '/'
  if (url.includes('google.')) return res.send('Invalid!');
  else res.redirect(307, `${req.protocol + '://' + req.get('host') + '/'}${token[Math.floor(Math.random()*token.length)]}/${req.query.url}#${token[Math.floor(Math.random()*token.length)]}`);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + config.mainPagePath);
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + config.notFoundPagePath);
});

app.listen(process.env.PORT, () => {
  console.log(`Launched on port ${process.env.PORT}`);
});","sourceMap":""}
