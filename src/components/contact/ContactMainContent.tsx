import ContactForm from "../forms/ContactForm";
import TitleHeading from "../shared/TitleHeading";

const ContactMainContent = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 md:py-0">
      <div className="w-full md:w-[95%] xl:w-[85%]">
        <TitleHeading
          heading="با من تماس بگیرید"
          text="به من پیام بدهید تا همین امروز پروژه‌ی شما را آغاز کنیم."
        />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactMainContent;
