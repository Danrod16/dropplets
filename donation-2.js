parcelRequire = (function(e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function(r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    Rjks: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var e = {
          base: {
            color: "#32325d",
            fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "18px",
            "::placeholder": { color: "#aab7c4" },
          },
          invalid: { color: "#fa755a", iconColor: "#fa755a" },
        };
        exports.default = e;
      },
      {},
    ],
    FbHg: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = m);
        var e = t(require("./elementsStyle"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = Stripe("pk_live_ZuvxnU7DyNyLQCwFRKdmbw4d00GTMle8qs"),
          n = r.elements(),
          a = n.create("cardNumber", { style: e.default }),
          c = n.create("cardExpiry", { style: e.default }),
          d = n.create("cardCvc", { style: e.default }),
          u = n.create("idealBank", { style: e.default });
        var l = document.getElementById("card-errors"),
          o = { cardNumber: null, expireDate: null, cardCvc: null };
        function i(e, t) {
          (o[t] = e), (l.textContent = e);
        }
        function s(e) {
          (o[e] = null),
            o.cardNumber
              ? (l.textContent = o.cardNumber)
              : o.expireDate
              ? (l.textContent = o.expireDate)
              : o.cardCvc
              ? (l.textContent = o.cardCvc)
              : (l.textContent = "");
        }
        function m() {
          return (
            a.mount("#card-element"),
            c.mount("#expire-element"),
            d.mount("#cvc-element"),
            u.mount("#ideal-bank-element"),
            a.addEventListener("change", function(e) {
              e.error ? i(e.error.message, "cardNumber") : s("cardNumber");
            }),
            c.addEventListener("change", function(e) {
              e.error ? i(e.error.message, "expireDate") : s("expireDate");
            }),
            d.addEventListener("change", function(e) {
              e.error ? i(e.error.message, "cardCvc") : s("cardCvc");
            }),
            { stripe: r, idealBank: u, cardElement: a }
          );
        }
      },
      { "./elementsStyle": "Rjks" },
    ],
    Focm: [
      function(require, module, exports) {
        "use strict";
        var e = t(require("./elementsSetup"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const n = (0, e.default)(),
          a = n.stripe,
          d = n.cardElement,
          s = n.idealBank;
        let i = "card";
        const r = document.getElementById("donation-form"),
          o = document.getElementById("donation-amount"),
          c = document.getElementById("full-name-field"),
          l = document.getElementById("greeting-message"),
          m = document.getElementById("email-field"),
          u = document.getElementById("form-errors"),
          g = document.getElementById("newsletter-checkbox"),
          v = document.getElementById("submit-btn");
        r.addEventListener("submit", async (e) => {
          e.preventDefault(), (v.value = "Een moment geduld...");
          const t = Math.round(100 * parseInt(o.value)),
            n = l.value,
            r = m.value,
            E = g.checked,
            p = c.value;
          if ("card" === i) {
            const e = { email: r };
            p && (e.name = p);
            const s = await a.createPaymentMethod("card", d, {
                billing_details: e,
              }),
              i = s.paymentMethod,
              o = s.error;
            if (o) u.textContent = o.message;
            else {
              (u.textContent = ""),
                I(
                  await axios.post(
                    "https://www.saveachildsheartnederland.nl/confirm_payment",
                    {
                      paymentMethodId: i.id,
                      amount: t,
                      greeting: n,
                      email: r,
                      newsletterSignup: E,
                      description: PAYMENT_DESCRIPTION,
                    }
                  )
                );
            }
          } else {
            const e = {
              type: "ideal",
              amount: t,
              currency: "EUR",
              metadata: {
                greeting: n,
                email: r,
                newsletterSignup: E,
                description: PAYMENT_DESCRIPTION,
                REDIRECT_URL: REDIRECT_URL,
              },
              redirect: {
                return_url:
                  "https://www.saveachildsheartnederland.nl/kom-in-actie/doneer/payment-process-dutch",
              },
            };
            p && (e.owner = { name: p });
            const d = await a.createSource(s, e),
              i = d.source,
              o = d.error;
            if (o) {
              document.getElementById("error-message").textContent = o.message;
            } else document.location.href = i.redirect.url;
          }
        });
        const E = document.getElementById("card-switch"),
          p = document.getElementById("iDeal-switch"),
          y = document.getElementById("payment-section-card"),
          h = document.getElementById("payment-section-ideal");
        function I(e) {
          const t = e.data,
            n = t.error,
            d = t.requires_action,
            s = t.payment_intent_client_secret;
          n
            ? ((u.textContent = n.message),
              v.classList.add("button-failed", "button-disabled"),
              (v.disabled = !0),
              (v.value = "An error occured."))
            : d
            ? a.handleCardAction(s).then((e) => {
                e.error
                  ? ((u.textContent = e.error.message),
                    v.classList.add("button-failed", "button-disabled"),
                    (v.disabled = !0),
                    (v.value = "An error occured."),
                    console.warn(e.error))
                  : axios
                      .post("https://www.saveachildsheartnederland.nl/confirm_payment", {
                        paymentIntentId: e.paymentIntent.id,
                      })
                      .then(I)
                      .catch((e) => {
                        v.classList.add("button-failed", "button-disabled"),
                          (v.disabled = !0),
                          (v.value = "Your card was declined.");
                      });
              })
            : (v.classList.add("button-success", "button-disabled"),
              (v.disabled = !0),
              (v.value = "Donatie verwerkt!"),
              setTimeout(() => window.location.replace(REDIRECT_URL), 1500));
        }
        E.addEventListener("click", (e) => {
          e.preventDefault(),
            E.classList.remove("inactive"),
            p.classList.add("inactive"),
            y.classList.remove("hidden"),
            h.classList.add("hidden"),
            (i = "card");
        }),
          p.addEventListener("click", (e) => {
            e.preventDefault(),
              p.classList.remove("inactive"),
              E.classList.add("inactive"),
              h.classList.remove("hidden"),
              y.classList.add("hidden"),
              (i = "ideal");
          });
      },
      { "./elementsSetup": "FbHg" },
    ],
    Xmoj: [
      function (require, module, exports) {
        "use strict";
        var e = n(require("./stripe/elements/elementsSetup")),
          t = n(require("./stripe/createIdealSource")),
          a = n(require("./helpers/initDOMElements"));
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const i = (0, e.default)(),
          s = i.stripe,
          r = i.cardElement,
          o = i.idealBank,
          d = (0, a.default)();
        let l = "one-time",
          c = "plan_FUIxzfuPl4eLAs",
          m = 1000,
          u = r;
        async function h(e) {
          try {
            if ("card" === u) {
              const t = await axios.get(
                  "https://www.saveachildsheartnederland.nl/setup_intent"
                ),
                a = await s.handleCardSetup(t.data.client_secret, r, {
                  payment_method_data: {
                    billing_details: { name: e.fullName, email: e.email },
                  },
                });
              if (a.setupIntent) {
                const t = await axios.post(
                  "https://www.saveachildsheartnederland.nl/create_recurring",
                  {
                    paymentType: "card",
                    paymentMethodId: a.setupIntent.payment_method,
                    subscriptionPlanId: c,
                    email: e.email,
                    name: e.fullName,
                    metadata: { newsletterSignup: e.newsletterSignup },
                  }
                );
                  console.log("this is 289t")
                  console.log(t)
                if ("incomplete" === t.data.status) {
                  const e = await s.handleCardPayment(
                    t.data.latest_invoice.payment_intent.client_secret
                  );
                  e.error ? (d.formErrors.textContent = e.error.message) : v();
                } else "active" === t.data.status && v();
              } else
                a.error &&
                  ((d.formErrors.textContent = a.error.message),
                  console.error(a.error));
            } else {
              const a = m,
                n = {
                  email: e.email,
                  newsletterSignup: e.newsletterSignup,
                  description: PAYMENT_DESCRIPTION,
                  subscriptionPlanId: c,
                  recurring: !0,
                  REDIRECT_URL: REDIRECT_URL,
                },
                i = await (0, t.default)(e.fullName, a, n, o),
                s = i.source,
                r = i.error;
              s
              console.log("This is n315")
              console.log(n)
                ? (document.location.href = s.redirect.url)
                : r && (d.formErrors.textContent = r.message);
            }
          } catch (a) {
            d.formErrors.textContent = a.message;
          }
        }
        function p(e) {
          const t = e.data,
            a = t.error,
            n = t.requires_action,
            i = t.payment_intent_client_secret;
          a
            ? ((d.formErrors.textContent = a.message),
              d.submitBtn.classList.add("button-failed", "button-disabled"),
              (d.submitBtn.disabled = !0),
              (d.submitBtn.value = "An error occured."))
            : n
            ? s.handleCardAction(i).then((e) => {
                e.error
                  ? ((d.formErrors.textContent = e.error.message),
                    d.submitBtn.classList.add(
                      "button-failed",
                      "button-disabled"
                    ),
                    (d.submitBtn.disabled = !0),
                    (d.submitBtn.value = "An error occured."),
                    console.warn(e.error))
                  : axios
                      .post("https://www.saveachildsheartnederland.nl/confirm_payment", {
                        paymentIntentId: e.paymentIntent.id,
                      })
                      .then(p)
                      .catch((e) => {
                        d.submitBtn.classList.add(
                          "button-failed",
                          "button-disabled"
                        ),
                          (d.submitBtn.disabled = !0),
                          (d.submitBtn.value = "Your card was declined.");
                      });
              })
            : v();
        }
        function v() {
          d.submitBtn.classList.add("button-success", "button-disabled"),
            (d.submitBtn.disabled = !0),
            (d.submitBtn.value = "Donatie verwerkt!"),
            setTimeout(() => window.location.replace(REDIRECT_URL), 1500);
        }
        d.form.addEventListener("submit", async (e) => {
          e.preventDefault(), (d.submitBtn.value = "Een moment geduld...");
          const a = d.fullNameField.value,
            n = d.emailField.value,
            i = d.newsletterCheckbox.checked,
            c = { email: n, fullName: a, newsletterSignup: i };
          if ("monthly" === l) h(c);
          else {
            const e = Math.round(100 * parseInt(d.amountField.value));
            if ("card" === u) {
              const t = await s.createPaymentMethod("card", r, {
                  billing_details: { name: c.fullName, email: c.email },
                }),
                a = t.paymentMethod,
                o = t.error;
              if (o) d.formErrors.textContent = o.message;
              else {
                (d.formErrors.textContent = ""),
                  p(
                    await axios.post(
                      "https://www.saveachildsheartnederland.nl/confirm_payment",
                      {
                        paymentMethodId: a.id,
                        amount: e,
                        email: n,
                        newsletterSignup: i,
                        description: PAYMENT_DESCRIPTION,
                      }
                    )
                  );
                    console.log("This is amount: e")
                    console.log(e)
              }
            } else {
              const s = {
                  email: n,
                  newsletterSignup: i,
                  description: PAYMENT_DESCRIPTION,
                  REDIRECT_URL: REDIRECT_URL,
                },
                r = await (0, t.default)(a, e, s, o),
                l = r.source,
                c = r.error;
              l
                ? (document.location.href = l.redirect.url)
                : c && (d.formErrors.textContent = c.message);
            }
          }
        }),
          d.oneTimeSwitch.addEventListener("click", () => {
            d.oneTimeSwitch.classList.remove("not-active"),
              d.monthlySwitch.classList.add("not-active"),
              d.amountContainer.classList.remove("hidden"),
              d.amountField.setAttribute("required", !0),
              d.donationPlansWrapper.classList.add("hidden"),
              d.mandatePolicy.classList.add("hidden"),
              (l = "one-time");
          }),
          d.monthlySwitch.addEventListener("click", () => {
            d.monthlySwitch.classList.remove("not-active"),
              d.oneTimeSwitch.classList.add("not-active"),
              d.amountContainer.classList.add("hidden"),
              d.amountField.removeAttribute("required"),
              d.donationPlansWrapper.classList.remove("hidden"),
              d.mandatePolicy.classList.remove("hidden"),
              (l = "monthly");
          }),
          d.donationPlansButtons.forEach((e) => {
            e.addEventListener("click", (e) => {
              const t = e.target;
              t.classList.remove("not-active"),
                d.donationPlansButtons.forEach(
                  (e) => e !== t && e.classList.add("not-active")
                ),
                (c = t.dataset.planId),
                (m = t.dataset.amount);
            });
          }),
          d.moreAmountsBtn.addEventListener("click", () => {
            d.hiddenPlansButtons.classList.remove("hidden"),
              d.moreAmountsBtn.classList.add("hidden");
          }),
          d.cardSwitch.addEventListener("click", (e) => {
            e.preventDefault(),
              d.cardSwitch.classList.remove("inactive"),
              d.iDealSwitch.classList.add("inactive"),
              d.cardSection.classList.remove("hidden"),
              d.iDealSection.classList.add("hidden"),
              (u = "card");
          }),
          d.iDealSwitch.addEventListener("click", (e) => {
            e.preventDefault(),
              d.iDealSwitch.classList.remove("inactive"),
              d.cardSwitch.classList.add("inactive"),
              d.iDealSection.classList.remove("hidden"),
              d.cardSection.classList.add("hidden"),
              (u = "ideal");
          });
      },
      {
        "./stripe/elements/elementsSetup": "XxEM",
        "./stripe/createIdealSource": "GhFC",
        "./helpers/initDOMElements": "Xa8A",
      },
    ],
  },
  {},
  ["Focm"],
  null
);
