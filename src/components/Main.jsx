
import Inventory from './Inventory/Inventory';
import TeamMembers from './TeamMembers/TeamMembers';

export default function Main(props) {

       
    return (
        <main>            

            <div style={{ display: props.mainDisplay === "Inventory" ? "block" : "none" }}>
                <Inventory />
            </div>
            <div style={{ display: props.mainDisplay === "Team Members" ? "block" : "none" }}>
                <TeamMembers />
            </div>

        </main>
    )
}