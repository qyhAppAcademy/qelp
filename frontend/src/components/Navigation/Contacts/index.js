import "./index.css";

const AWS = "https://qelp-seeds.s3.amazonaws.com/contacts";

const CONTACTS = [
    {
        name: "github",
        url: "https://github.com/qyhAppAcademy"
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/qiaoyanghan"
    },
];

const Contacts = () => {
    const contacts = CONTACTS.map((CONTACT, idx) => (
        <button
            className="contact"
            onClick={() => window.location.href = CONTACT.url}
            key={idx}
        >
            <img
                src={`${AWS}/${CONTACT.name}.png`}
                alt={`${CONTACT.name}`}
            />
        </button>
    ));

    return <div className="contacts">{contacts}</div>;
};

export default Contacts;