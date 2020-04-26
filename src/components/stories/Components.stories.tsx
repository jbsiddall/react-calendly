import * as React from "react";
import "./styles.css";
const { withKnobs, text, boolean, object } = require("@storybook/addon-knobs");

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import InlineWidget from "../InlineWidget/InlineWidget";
import PopupText from "../PopupText/PopupText";
import PopupWidget from "../PopupWidget/PopupWidget";
import CalendlyEventListener from "../CalendlyEventListener/CalendlyEventListener";
import { PageSettings, Utm, Prefill } from "../../calendly";

const prefill: Prefill = {
  name: "Jon Snow",
  firstName: "Jon",
  lastName: "Snow",
  email: "test@test.com",
  customAnswers: {
    a1: "a1",
    a2: "a2",
    a3: "a3",
    a4: "a4",
    a5: "a5",
    a6: "a6",
    a7: "a7",
    a8: "a8",
    a9: "a9",
    a10: "a10",
  },
};

const utm: Utm = {
  utmCampaign: "Spring Sale 2019",
  utmSource: "Facebook",
  utmMedium: "Ad",
  utmContent: "Shoe and Shirts",
  utmTerm: "Spring",
};

const pageSettings: PageSettings = {
  backgroundColor: "ffffff",
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
  primaryColor: "00a2ff",
  textColor: "4d5055",
};

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .add("InlineWidget", () => (
    <InlineWidget
      url={text("url", "https://calendly.com/acmesales")}
      styles={object("styles", {
        height: "1000px",
      })}
      prefill={object("prefill", prefill)}
      utm={object("utm", utm)}
      pageSettings={object("pageSettings", pageSettings)}
    />
  ))
  .add("PopupText", () => (
    <PopupText
      url={text("url", "https://calendly.com/acmesales")}
      text={text("text", "Click here to schedule!")}
      prefill={object("prefill", prefill)}
      utm={object("utm", utm)}
      pageSettings={object("pageSettings", pageSettings)}
    />
  ))
  .add("PopupWidget", () => (
    <PopupWidget
      url={text("url", "https://calendly.com/acmesales")}
      text={text("text", "Click here to schedule!")}
      color={text("color", "#00a2ff")}
      textColor={text("textColor", "#ffffff")}
      branding={boolean("branding", true)}
      prefill={object("prefill", prefill)}
      utm={object("utm", utm)}
      pageSettings={object("pageSettings", pageSettings)}
    />
  ))
  .add("CalendlyEventListener", () => {
    const eventId = "calendly-event";
    const instructions =
      "The embedded scheduling page notifies the parent window of important events during the booking flow. " +
      "Interact with the Calendly iframe below to trigger different Calendly events. " +
      `A full list of available Calendly events can be found `;

    const calendlyEventHandler = (e: any) => {
      document.getElementById(eventId)!.innerText = JSON.stringify(e.data);
    };

    return (
      <>
        <div style={{ textAlign: "center", width: "50%", margin: "0 auto" }}>
          <h4>
            {instructions}
            <a
              href={
                "https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options#3"
              }
              target="_blank"
            >
              here
            </a>
            {"."}
          </h4>
          <div>
            Calendly Event: <span id={eventId}></span>
          </div>
        </div>
        <CalendlyEventListener
          onDateAndTimeSelected={calendlyEventHandler}
          onEventScheduled={calendlyEventHandler}
          onEventTypeViewed={calendlyEventHandler}
          onProfilePageViewed={calendlyEventHandler}
        >
          <div
            style={{
              minWidth: "320px",
              height: "630px",
            }}
          >
            <iframe
              frameBorder="0"
              height="100%"
              width="100%"
              src={`https://calendly.com/acmesales?embed_domain=${document.location.host}&embed_type=Inline`}
            />
          </div>
        </CalendlyEventListener>
      </>
    );
  });
