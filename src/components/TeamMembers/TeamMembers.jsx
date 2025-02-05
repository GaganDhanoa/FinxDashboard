import { useEffect,useState } from "react";
import {useUser} from "/src/components/User/UserContext.jsx"

import MemberCard from "./MemberCard"

export default function TeamMembers(props) {

    const { allUsers } = useUser();    

    

    const [teamMemberElements, setTeamMemberElements] = useState([]);

    useEffect(() => {
        console.log("team :::: ",allUsers)
        let temp = [];
        for(let i = 0; i < allUsers.length; i++) {
            temp.push(<MemberCard member={allUsers[i]} key={i}/>);
        }        

        setTeamMemberElements(temp);

    }, [allUsers])

    return (
        <div className="team-members-section"> 
            {teamMemberElements}
        </div>
    )
}