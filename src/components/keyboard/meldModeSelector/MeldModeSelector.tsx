import { MeldMode } from "./MeldMode";
import "./MeldModeSelector.css"

interface MeldModeSelectorProps {
    meldMode: MeldMode | undefined,
    createOnButtonClickSetMeldMode: (newMeldMode: MeldMode | undefined) => () => void
}

function MeldModeSelector(props: MeldModeSelectorProps) {

    function getButtonClassName(meldMode: MeldMode) {
        return props.meldMode === meldMode ? "selected" : undefined;
    }

    return <>
        <div id="meld-mode-selector">
            <details>
                <summary>Toggle Meld Mode</summary>
                <p> For Chows, choose the first tile in the same-suit sequence of three, and the Chow will be added to your hand. <br />
                For all other melds, choose a tile that has sufficient quantity, and the desired meld will be added to your hand. <br />
                If you want tiles from your concealed melds to potentially be moved around to maximize points, clear meld mode and click the tiles manually.</p>
            </details>
            <div className="selector-row">
                <button className={getButtonClassName(MeldMode.CONCEALED_PAIR)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.CONCEALED_PAIR)} >Concealed Pair</button>
                {' '}
                <button className={getButtonClassName(MeldMode.EXPOSED_PAIR)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.EXPOSED_PAIR)} >Exposed Pair</button>
                {' '}
                <button className={getButtonClassName(MeldMode.CONCEALED_CHOW)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.CONCEALED_CHOW)} >Concealed Chow</button>
                {' '}
                <button className={getButtonClassName(MeldMode.EXPOSED_CHOW)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.EXPOSED_CHOW)} >Exposed Chow</button>
            </div>
            <div className="selector-row">
                <button className={getButtonClassName(MeldMode.CONCEALED_PONG)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.CONCEALED_PONG)} >Concealed Pong</button>
                {' '}
                <button className={getButtonClassName(MeldMode.EXPOSED_PONG)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.EXPOSED_PONG)} >Exposed Pong</button>
                {' '}
                <button className={getButtonClassName(MeldMode.CONCEALED_KONG)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.CONCEALED_KONG)} >Concealed Kong</button>
                {' '}
                <button className={getButtonClassName(MeldMode.EXPOSED_KONG)} onClick={props.createOnButtonClickSetMeldMode(MeldMode.EXPOSED_KONG)} >Exposed Kong</button>
            </div>
            <button onClick={props.createOnButtonClickSetMeldMode(undefined)}>Clear Meld Mode</button>
        </div>
    </>;
}

export default MeldModeSelector