import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;
    
    constructor(props) {
        super(props);
        this.state = { business: null, loading: true };
        this.getCompanyDetails = this.getCompanyDetails.bind(this);
        this.nip = "";

    }

    static renderBusinessTable(business) {
        return (
            <table className = 'table table-striped' aria- labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>{business.name}</td>
                    </tr>
                    <tr>
                        <th>NIP</th>
                        <td>{business.nip}</td>
                    </tr>
                    <tr>
                        <th>Status Vat</th>
                        <td>{business.statusVat}</td>
                    </tr>
                    <tr>
                        <th>REGON</th>
                        <td>{business.regon}</td>
                    </tr>
                    <tr>
                        <th>PESEL</th>
                        <td>{business.pesel}</td>
                    </tr>
                    <tr>
                        <th>KRS</th>
                        <td>{business.krs}</td>
                    </tr>
                    <tr>
                        <th>Residence Address</th>
                        <td>{business.residenceAddress}</td>
                    </tr>
                    <tr>
                        <th>Working Address</th>
                        <td>{business.workingAddress}</td>
                    </tr>
                    <tr>
                        <th>Representatives</th>
                        <td>{business.representatives.map((representative) =>
                            <li>
                                <b>First name: </b>{representative.firstName}
                                , <b>Last name: </b>{representative.lastName}
                                , <b>PESEL: </b>{representative.pesel}
                                , <b>NIP: </b>{representative.nip}
                                , <b>Company name: </b>{representative.companyName}
                            </li>)}</td>
                    </tr>
                    <tr>
                        <th>Authorized Clerks</th>
                        <td>{business.authorizedClerks}</td>
                        <td>{business.authorizedClerks.map((authorizedClerk) =>
                            <li>
                                <b>First name: </b>{authorizedClerk.firstName}
                                , <b>Last name: </b>{authorizedClerk.lastName}
                                , <b>PESEL: </b>{authorizedClerk.pesel}
                                , <b>NIP: </b>{authorizedClerk.nip}
                                , <b>Company name: </b>{authorizedClerk.companyName}
                            </li>)}</td>
                    </tr>
                    <tr>
                        <th>Partners</th>
                        <td>{business.partners.map((partner) =>
                            <li>
                                <b>First name: </b>{partner.firstName}
                                , <b>Last name: </b>{partner.lastName}
                                , <b>PESEL: </b>{partner.pesel}
                                , <b>NIP: </b>{partner.nip}
                                , <b>Company name: </b>{partner.companyName}
                            </li>)}</td>
                    </tr>
                    <tr>
                        <th>Registration Legal Date</th>
                        <td>{business.registrationLegalDate}</td>
                    </tr>
                    <tr>
                        <th>Registration Denial Date</th>
                        <td>{business.registrationDenialDate}</td>
                    </tr>
                    <tr>
                        <th>Registration Denial Basis</th>
                        <td>{business.registrationDenialBasis}</td>
                    </tr>
                    <tr>
                        <th>Restoration Date</th>
                        <td>{business.restorationDate}</td>
                    </tr>
                    <tr>
                        <th>Restoration Basis</th>
                        <td>{business.restorationBasis}</td>
                    </tr>
                    <tr>
                        <th>Removal Date</th>
                        <td>{business.removalDate}</td>
                    </tr>
                    <tr>
                        <th>Removal Basis</th>
                        <td>{business.removalBasis}</td>
                    </tr>
                    <tr>
                        <th>Account Numbers</th>
                        <td>{business.accountNumbers.map((accountNumber) => <li>{accountNumber}</li>)}</td>
                    </tr>
                    <tr>
                        <th>Has Virtual Accounts</th>
                        <td>{business.hasVirtualAccounts}</td>
                    </tr>
                </thead>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Enter the NIP number in the field and press the button</em></p>
            : FetchData.renderBusinessTable(this.state.business);

        return (
            <div>

                <h1 id="tabelLabel" >Entrepreneurs searcher</h1>
                <p>Searching for an entrepreneur by NIP number.</p>

                <label>
                    NIP:&nbsp;
                    <input type="number" value={this.state.value} onChange={this.handleChange} />&nbsp;
                </label>


                <button className="btn btn-primary" onClick={this.getCompanyDetails}>Search</button>

                {contents}
            </div>
        );
    }
        
    async getCompanyDetails() {
            const response = await fetch('searcher?nip=' + this.nip)
            const data = await response.json();
            this.setState({ business: data, loading: false });  
    }

    handleChange = event => {
        this.nip = event.target.value;
    };
}