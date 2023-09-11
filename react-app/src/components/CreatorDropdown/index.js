import "./CreatorDropdown.css";

function CreatorDropdown() {
  return (
    <div className="creator-container">
      <h1>Connect with us!</h1>
      <div className="creator">
        <p>Alex Breathwit:</p>

        <a href="https://github.com/BadaBingBadaBo0m" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/alex-breathwit-70a011272/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="creator">
        <p>Emily Morgan:</p>

        <a href="https://github.com/mocemmy" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/emily-morgan-7761b1155"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="creator">
        <p>James Cao:</p>

        <a href="https://github.com/jameslovescoding" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/james-cao-15a0b477/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="creator">
        <p>Ryan Erickson:</p>

        <a href="https://github.com/RyanFullStack" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/ryan-erickson-dev/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default CreatorDropdown;
