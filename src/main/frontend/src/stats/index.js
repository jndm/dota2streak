import React, {Component} from 'react';
import axios from 'axios';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streak: null
        }
    }

    componentDidMount = async () => {

        // TODO: Voisi tuoda käyttäjätiedot myös?
        /*
        let user = this.props.user;
        if(user == null) {
            // TODO: hae käyttäjätiedot uudelleen apista account_id:n perusteella.
            // TODO: huom. vaatii muokkausta myös backendin similarityn mukaan järjestelyyn, koska id:n perusteella haku ei palauta similarityä ollenkaan jos täsmää täysin.
        }
        this.setState({user: user});
        */
        let accountId = this.props.match.params.accountId;
        console.log(this.props.match.params.accountId);
        try {
            let response = await axios.get('/matches', { params: { accountId } });
            if(response.data == null) {
                throw new Error("Unable to find gaming history for id: ", );
            }
            this.setState({streak: response.data});
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        let streak = this.state.streak;
        if(!streak) {
            return null;
        }

        return (
            <div>
                <div>
                    Yhteensä:
                </div>
                <div>
                    {streak.combinedStreak.win ? 'Vihreää: ' : 'Punaista: '}
                    {streak.combinedStreak.count}
                </div>

                <div>
                    Ranked:
                </div>
                <div>
                    {streak.rankedStreak.win ? 'Vihreää: ' : 'Punaista: '}
                    {streak.rankedStreak.count}
                </div>


                <div>
                    Unranked:
                </div>
                <div>
                    {streak.unrankedStreak.win ? 'Vihreää: ' : 'Punaista: '}
                    {streak.unrankedStreak.count}
                </div>
            </div>
        );
    }
}

export default Stats;