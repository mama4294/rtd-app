function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex h-16 w-full items-center justify-between px-4 text-xs sm:text-sm">
      <div>Matthew Malone</div>
      <div className="flex-col gap-1 sm:flex-row sm:flex">
        <p>Copyright © {currentYear}</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
