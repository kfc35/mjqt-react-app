import './AboutContent.css';
import getUnicodeRepresentation from '../../content/mahjongTileUnicodeMap';
import { WHITE_DRAGON } from 'mjqt-scoring';

function AboutContent() {
    return <>
      <div className="card" id="about">
        <p>{"\uD83C\uDC04"} This React-based Single Page Application was created by Kevin (<a href="https://github.com/kfc35" target="_blank" rel="noreferrer">https://github.com/kfc35</a>)</p>
        <p>{"\uD83C\uDC04"} The Typescript Library that powers this application is Open Source under the GNU LGPL v3.0 License: <a href="https://github.com/kfc35/mjqt-scoring" target="_blank" rel="noreferrer">https://github.com/kfc35/mjqt-scoring</a></p>
        <p>{"\uD83C\uDC04"} You can peruse the front-end code here: <a href="https://github.com/kfc35/mjqt-react-app" target="_blank" rel="noreferrer">https://github.com/kfc35/mjqt-react-app</a></p>
        <p>{"\uD83C\uDC04"} Kevin is not too great at front-end design, so any feedback/advice is appreciated!</p>
      </div>
    </>
}

export default AboutContent;