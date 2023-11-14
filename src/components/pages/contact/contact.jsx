import BackButton from "components/global/BackButton";
import ContactForm from "../../global/contactForm";
import "./contact.scss";

function Contact() {
  return (
    <div className="contact">
      <BackButton formVariant />
      <ContactForm />
    </div>
  );
}

export default Contact;
