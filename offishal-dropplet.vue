
<template>
  <div class="scary-numbers-page">
    <page-hero>
      <h1>{{ $t('calculator.title') }}<span class="accent">.</span></h1>
    </page-hero>
    <base-container>
      <div class="scary-numbers-page__row">
        <div class="scary-numbers-page__col-lg">
          <h2 class="scary-numbers-page__subtitle">
            💰 {{ $t('calculator.subtitle') }}
          </h2>

          <p class="scary-numbers-page__description">
            <BaseMarkdown :content="$t('calculator.description')" />
          </p>

          <div>
            <h3 class="scary-numbers-page__label">
              ⏱️ {{ $t('calculator.form.timeLabel') }}
            </h3>

            <div>
              <div class="scary-numbers-page__times">
                <div
                  :class="[
                    'scary-numbers-page__time',
                    { 'scary-numbers-page__time--selected': time === 15 }
                  ]"
                  @click="setTime(15)"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path
                      d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.timeLow') }}</p>
                </div>
                <div
                  :class="[
                    'scary-numbers-page__time',
                    { 'scary-numbers-page__time--selected': time === 30 }
                  ]"
                  @click="setTime(30)"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path
                      d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.timeMedium') }}</p>
                </div>
                <div
                  :class="[
                    'scary-numbers-page__time',
                    { 'scary-numbers-page__time--selected': time === 60 }
                  ]"
                  @click="setTime(60)"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path
                      d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.timeHigh') }}</p>
                </div>
              </div>
            </div>

            <transition name="fade">
              <base-card v-show="time < 30" class="scary-numbers-page__tips">
                <div class="scary-numbers-page__tip">
                  <h3 class="scary-numbers-page__tip-title">
                    🤯 {{ $t('calculator.subsubtitle') }}
                  </h3>
                  <p>{{ $t('calculator.subdescription') }}</p>
                </div>
              </base-card>
            </transition>

            <div
              class="scary-numbers-page__total scary-numbers-page__total--partial"
            >
              <h3 class="scary-numbers-page__results-title">
                {{ $t('calculator.annualCost') }}
              </h3>
              <p class="scary-numbers-page__results-number--sm">
                {{ subtotal.toLocaleString() }} €
              </p>
            </div>
          </div>

          <div>
            <h3 class="scary-numbers-page__label">
              🗺️ {{ $t('calculator.form.officeLocationLabel') }}
            </h3>

            <div>
              <div class="scary-numbers-page__offices">
                <div
                  :class="[
                    'scary-numbers-page__office',
                    {
                      'scary-numbers-page__office--selected':
                        location === 'city'
                    }
                  ]"
                  @click="setLocation('city')"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorPrimary"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path
                      d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.officeLocationCentral') }}</p>
                </div>
                <div
                  :class="[
                    'scary-numbers-page__office',
                    {
                      'scary-numbers-page__office--selected':
                        location === 'area'
                    }
                  ]"
                  @click="setLocation('area')"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path
                      d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.officeLocationArea') }}</p>
                </div>
                <div
                  :class="[
                    'scary-numbers-page__office',
                    {
                      'scary-numbers-page__office--selected':
                        location === 'region'
                    }
                  ]"
                  @click="setLocation('region')"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                  </svg>
                  <p>{{ $t('calculator.form.officeLocationRegion') }}</p>
                </div>
                <div
                  :class="[
                    'scary-numbers-page__office',
                    {
                      'scary-numbers-page__office--selected':
                        location === 'average'
                    }
                  ]"
                  @click="setLocation('average')"
                >
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-colorDisabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style="width: 80px; height: 80px"
                  >
                    <path d="M8.17 5.7L1 10.48V21h5v-8h4v8h5V10.25z"></path>
                    <path
                      d="M10 3v1.51l2 1.33L13.73 7H15v.85l2 1.34V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z"
                    ></path>
                  </svg>
                  <p>{{ $t('calculator.form.officeLocationBoth') }}</p>
                </div>
              </div>
            </div>

            <div
              class="scary-numbers-page__total scary-numbers-page__total--partial"
            >
              <h3 class="scary-numbers-page__results-title">
                {{ $t('calculator.annualCost') }}
              </h3>
              <p class="scary-numbers-page__results-number--sm">
                {{ locationFee.toLocaleString() }} €
              </p>
            </div>
          </div>

          <div>
            <div class="scary-numbers-page__employees-section">
              <p>{{ $t('calculator.employeeDescription') }}</p>
              <h3 class="scary-numbers-page__label">
                🤷 {{ $t('calculator.form.employeesLabel') }}
              </h3>
              <div class="scary-numbers-page__employees">
                <vue-slider
                  v-model="employees"
                  :min="1"
                  :max="500"
                  :marks="['1', '100', '200', '300', '400', '500']"
                ></vue-slider>
              </div>
            </div>

            <div class="scary-numbers-page__results-block">
              <div class="scary-numbers-page__results">
                <h3 class="scary-numbers-page__results-title">
                  {{ $t('calculator.cost') }}
                </h3>
                <p class="scary-numbers-page__results-number">
                  {{ total.toLocaleString() }} €
                </p>

                <h3 class="scary-numbers-page__results-title">
                  {{ $t('calculator.savings') }}
                </h3>
                <p
                  class="scary-numbers-page__results-number scary-numbers-page__results-number--saved"
                >
                  {{ savings.toLocaleString() }} €
                </p>
              </div>

              <base-button
                class="scary-numbers-page__button"
                :url="signupLink"
                >{{ $t('calculator.callToAction') }}</base-button
              >
            </div>

            <div class="scary-numbers-page__call-to-action">
              <h3 class="scary-numbers-page__contact">
                {{ $t('calculator.contactText') }}
              </h3>
              <TheEmailCollector />
              <p class="scary-numbers-page__info">
                {{ $t('calculator.infos') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </base-container>
  </div>
</template>
