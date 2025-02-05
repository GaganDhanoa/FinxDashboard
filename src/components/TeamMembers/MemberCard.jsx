export default function MemberCard(props) {
    return (
        <div className="member-card"> 
            <img className="vehicle-card-image" src={props.member.profile_picture_url} alt={props.member.first_name} />

            <div className="vehicle-card-info"> 

                <div className="vehicle-info">
                    <div className="info-div">
                        <span className="display-span"> {props.member.first_name} {props.member.last_name} </span>
                    </div>
                </div>

                <div className="vehicle-info">
                    <div className="info-div">
                        <span className="display-span"> {props.member.email} </span>
                    
                    </div>
                    <div className="info-div">
                    
                        <span className="display-span">  {props.member.role} </span>
                    </div>
                </div>

            </div>
        </div>
    )
}