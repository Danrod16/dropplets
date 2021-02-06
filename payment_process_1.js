<div id="payment-status">
      The payment is being processed...
    </div>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://js.stripe.com/v3/"></script>

<script>
      const stripe = Stripe('pk_live_ZuvxnU7DyNyLQCwFRKdmbw4d00GTMle8qs');
      const url = new URL(window.location.href);
      const SOURCE_ID = url.searchParams.get('source');
      const CLIENT_SECRET = url.searchParams.get('client_secret');
      const msg = document.getElementById('payment-status');
      const MAX_POLL_COUNT = 10;
      const REDIRECT_URL = "https://www.saveachildsheartnederland.nl/bedankt-voor-je-donatie";
      let pollCount = 0;

      const pollForSourceStatus = () => {
        stripe.retrieveSource({ id: SOURCE_ID, client_secret: CLIENT_SECRET }).then(({ source }) => {
          if (source.status === 'chargeable') {
            msg.textContent =
              'Your order was received and is awaiting payment confirmation. Please wait a few seconds.';
              console.log(source)
            axios
              .post('https://bat-mitzvah-eve.nl/charge', {
                token: { id: SOURCE_ID },
                amount: source.amount,
                email: source.owner.email,
                name: source.owner.name,
                metadata: {
                   newsletterSignup: source.metadata.newsletterSignup
                 }
              })
              .then(result => {
                if (result.status === 200) {
                  setTimeout(() => window.location.replace(REDIRECT_URL), 1200);
                }
              })
              .catch(err => {
                console.error(err);
                msg.textContent = 'An unexpected error occured. Please contact us at info@saveachildsheart.nl';
              });
          } else if (source.status === 'canceled' || source.status === 'failed') {
            msg.textContent =
              'Your payment failed and your order couldn’t be processed. Please contact us at info@saveachildsheart.nl for assistance.';
          } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
            // Try again in a second, if the Source is still `pending`:
            pollCount += 1;
            setTimeout(pollForSourceStatus, 1000);
          } else {
            // Depending on the Source status, show your customer the relevant message.
          }
        });
      };

      pollForSourceStatus();
    </script>
