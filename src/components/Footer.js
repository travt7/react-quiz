//this just returns a footer element that contains the children I pass in. I want the Timer
//and NextButton in the Footer. I could pass both instances into the return statement but I would
//have to pass all of their properties into this Footer just to pass then pass them into the
//Timer and NextButton.
function Footer({ children }) {
  return <footer>{children}</footer>;
}

export default Footer;
