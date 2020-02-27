import React from 'react';
import Moment from 'react-moment';
import MediaQuery from 'react-responsive';

const TableView = ({repositories, loading}) => {

    const desktop = repositories.map((repo) => {
        return (
            <tr key={repo.id}>
                <td><img alt={repo.name} className="avatar-desktop" src={repo.owner.avatar_url} /></td>
                <td><a className="link" href={repo.html_url}>{repo.name}</a></td>
                <td><Moment format="MM-DD-YYYY">{repo.created_at}</Moment></td>
                <td>{repo.forks}</td>
                <td>{repo.open_issues_count}</td>
            </tr>
        )
    })

    const mobile = repositories.map((repo) => {
        return (
            <div className="box" key={repo.id}>
                <div className="items">
                    <MediaQuery minWidth={295}>
                        <img alt={repo.name} className="avatar-mobile" src={repo.owner.avatar_url} />
                    </MediaQuery>
                    <a className="link" href={repo.html_url}>{repo.name}</a>
                    <br/>
                    <span className="title"> Created: </span><Moment format="MM-DD-YYYY">{repo.created_at}</Moment>
                    <br/>
                    <span className="title"> Forks: </span><span> {repo.forks} </span>
                    <br/>
                    <span className="title"> Open issues: </span> <span> {repo.open_issues_count} </span>
                </div>
            </div>
        )
    })

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
         <>
            {/* Mobile devices */}
            <MediaQuery maxWidth={699}>
            <div>
                {mobile}
            </div>
            </MediaQuery>
            {/* Desktop */}
            <MediaQuery minWidth={700}>
                <table style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{width: '25px'}}></th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Forks</th>
                            <th>Open issues</th>
                        </tr>
                    </thead>
                    <tbody>
                        {desktop}
                    </tbody>
                </table>
            </MediaQuery> 
        </>
    );
};

export default TableView;
