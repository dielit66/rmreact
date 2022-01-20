import './Header.css'
import logo from '../logo.svg'

function Header() {
    return (
        <header className="header">
            <div className={'header-wrapper'}>

<img src={logo}/>
            <div className={'nav-block'}>
                <ul className={'nav'}>
                    <li>Characters</li>
                    <li>Locations</li>
                    <li>Episodes</li>
                </ul>
            </div>
            </div>
        </header>
    );
}


export default Header;
