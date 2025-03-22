import { WinContext, WinContextBuilder } from "mjqt-scoring";
import "./WinContextEditor.css";

interface WinContextEditorProps {
    winContext: WinContext
    onWinContextUpdate: (newWinContext: WinContext) => void
}

function WinContextEditor(props: WinContextEditorProps) {

    function onCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.id === "mostRecentTileIsLastOfItsKind") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .mostRecentTileIsLastOfItsKind(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByRobbingAKong") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByRobbingAKong(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByLastTileOnWall") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByLastTileOnWall(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByLastDiscardOfGame") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByLastDiscardOfGame(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByKongReplacement") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByKongReplacement(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByFlowerReplacement") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByFlowerReplacement(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByKongOnKongReplacement") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByKongOnKongReplacement(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByFlowerOnFlowerReplacement") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByFlowerOnFlowerReplacement(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winByMixedDoubleReplacement") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winByMixedDoubleReplacement(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
        if (event.currentTarget.id === "winWithInitialHand") {
            const newWinContext = new WinContextBuilder().copyFrom(props.winContext)
                .winWithInitialHand(event.currentTarget.checked).build();
            props.onWinContextUpdate(newWinContext);
        }
    }

    return <>
        <div id="win-context-editor">
            <h3>Additional Win Context</h3>
            <table id="win-context-table">
            <tbody>
            <tr>
                <td><label htmlFor="mostRecentTileIsLastOfItsKind">Most Recent Tile is Last of its Kind: </label></td>
                <td><input type="checkbox" id="mostRecentTileIsLastOfItsKind" checked={props.winContext.mostRecentTileIsLastOfItsKind} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByRobbingAKong">Win by Robbing a Kong: </label></td>
                <td><input type="checkbox" id="winByRobbingAKong" checked={props.winContext.winByRobbingAKong} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByLastTileOnWall">Winning off the Last Tile of the Wall: </label></td>
                <td><input type="checkbox" id="winByLastTileOnWall" checked={props.winContext.winByLastTileOnWall} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByLastDiscardOfGame">Winning off the Last Discard of the Game: </label></td>
                <td><input type="checkbox" id="winByLastDiscardOfGame" checked={props.winContext.winByLastDiscardOfGame} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByKongReplacement">Winning off the Bonus Tile from declaring a Kong: </label></td>
                <td><input type="checkbox" id="winByKongReplacement" checked={props.winContext.winByKongReplacement} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByFlowerReplacement">Winning off the Bonus Tile from picking a Flower Tile: </label></td>
                <td><input type="checkbox" id="winByFlowerReplacement" checked={props.winContext.winByFlowerReplacement} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByKongOnKongReplacement">Winning off the Bonus Tile from declaring a Kong twice in succession: </label></td>
                <td><input type="checkbox" id="winByKongOnKongReplacement" checked={props.winContext.winByKongOnKongReplacement} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winByFlowerOnFlowerReplacement">Winning off the Bonus Tile from picking a Flower Tile twice in succession: </label></td>
                <td><input type="checkbox" id="winByFlowerOnFlowerReplacement" checked={props.winContext.winByFlowerOnFlowerReplacement} onChange={onCheckboxChange} /></td>
            </tr>
            <tr>
                <td><label htmlFor="winWithInitialHand">Winning with your initial hand or off the first discard: </label></td>
                <td><input type="checkbox" id="winWithInitialHand" checked={props.winContext.winWithInitialHand} onChange={onCheckboxChange} /></td>
            </tr>
            </tbody>
            </table>
        </div>
    </>;
}

export default WinContextEditor