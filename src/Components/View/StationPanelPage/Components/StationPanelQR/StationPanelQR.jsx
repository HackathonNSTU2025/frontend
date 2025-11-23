import "./StationPanelQR.scss";
import { QRCodeSVG } from "qrcode.react";

function StationPanelQR(props) {
    return (
        <div className="StationPanelQR">
            <div>Встать в очередь</div>
            <div className="StationPanelQR__Code">
                <QRCodeSVG
                    value={props.url}
                    size={300}
                    level="H"
                    marginSize={3}
                    // includeMargin={true}
                    renderAs="svg"
                />
            </div>
            <div>Отсканируйте QR-код, чтобы получить талон в очередь</div>
        </div>
    );
}
export default StationPanelQR;
