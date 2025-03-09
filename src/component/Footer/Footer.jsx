function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text p-10 bg-base-200">
      <aside className="flex items-center space-x-4">
        <img
          src="NULOGO-Drawing-BW-TH.png"
          alt="Naresuan University Logo"
          className="w-16 h-16"
        />
        <p className="text-sm">
          Naresuan University
          <br />© {new Date().getFullYear()} มหาวิทยาลัยนเรศวร. สงวนลิขสิทธิ์.
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Services</h6>
        <a
          href="https://mail.google.com/mail/?view=cm&to=dsiriporn2020@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          ติดต่อเรา
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
