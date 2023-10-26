import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Button } from "@react-email/button";
import { Hr } from "@react-email/hr";

interface WaitlistTemplateProps {
  email: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WaitlistTemplate = ({ email = "Zeno" }: WaitlistTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      Thanks for joining our waitlist; we'll keep you posted on the launch.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
          TRACKER
          <span style={{ color: "#4f46e5", fontStyle: "italic" }}>.LOL</span>
        </Text>
        <Text style={paragraph}>
          Hi <span style={{ textDecoration: "underline" }}>{email}</span>,
        </Text>
        <Text style={paragraph}>
          Thanks for joining the waitlist for Tracker, the ultimate web-based
          personal finance tracker.
        </Text>
        <Text style={{ ...paragraph, marginTop: "24px" }}>
          Be ready for an email on launch day!
        </Text>
        <Section style={{ ...btnContainer, marginTop: "32px" }}>
          <Button pX={12} pY={12} style={button} href="https://tracker.lol">
            Visit Website
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          <span>
            <a
              href="https://twitter.com/codewithbersh"
              target="_blank"
              style={{
                textDecoration: "underline",
              }}
            >
              @codewithbersh
            </a>
          </span>
          <span style={{ fontSize: "20px", marginLeft: "4px" }}>✨</span>
        </Text>
        <Hr style={hr} />
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "24px",
          }}
        >
          <a
            href="https://www.tracker.lol"
            style={{
              textDecoration: "underline",
              lineHeight: "14px",
              fontSize: "14px",
              color: "#737373",
              margin: "0 auto",
            }}
          >
            www.tracker.lol
          </a>
        </div>
      </Container>
    </Body>
  </Html>
);

export default WaitlistTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
};
