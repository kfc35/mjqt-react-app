import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function Footer() {
    return (
    <>
        <footer>
        <p>
        Disclaimer<br />
        This website was created just for fun and with love to the NYC Mahjong Community!<br />
        This website and its utilities are intended for educational and recreational purposes only. <br />
        This website does not claim its content and utilities to be complete, correct, or accurate. (The world of Mahjong is too large with so many variations... and honestly, there is probably a bug or two.)<br />
        This website does not accept liability for any loss or damages arising from its usage or referencing, either directly or indirectly. By using this website, you use it at your own risk.<br />
        If you or someone you know is struggling with a gambling problem, please contact the <a href="https://www.ncpgambling.org/help-treatment/" target="_blank">National Problem Gambling Helpline</a>.
        </p>
        <p>
        Made with 
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        and 
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        </p>
        </footer>
    </>
    )
}

export default Footer;