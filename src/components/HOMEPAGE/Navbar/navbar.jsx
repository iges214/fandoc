import "./navbar.css"
import { useState } from "react"
import {Menu, Search, ShoppingCart, User, ChevronDown, HelpCircle, Settings, LogOut, MessageCircle, FileText, Info, LogIn, UserPlus} from "lucide-react"


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const[isHelpOpen, setIsHelpOpen] = useState(false)
    const [search, setSearch] = useState("")

    // cart items count
    const cartItemsCount = 3;

    // function to handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search submitted:", search);
        // i will Implement search functionality/logic here later
    };

    return (
        <nav className="navbar">

            {/* left section: menu and logo */}
            <div className="navbar-left">
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
                    <Menu size={24}/>
                </button>

                {/* img logo */}
                <a className="logo">
                    <img src="/fandocImgLOGO.png
                    " alt="fandoc logo" className="logo-img"/>
                </a>
            </div>

            {/* middle section which is the search button */}
            <div className="navbar-search">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input type="text" className="seacrh-input" placeholder="Search Fantasy Doctor" value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-button" aria-label="Search">
                        <Search size={20}/>
                    </button>
                </form>
            </div>

            {/* right section: Account, Help, Cart */}
            <div className="navbar-right">

                {/* ACCOUNT and its dropdown menu */}
                <div className="dropdown">
                    <button className="Account-btn" onClick={()=> setIsAccountOpen(!isAccountOpen)} onBlur={()=> setIsAccountOpen((false), 150)}>
                        <User size={20}/>
                        <span>Account</span>
                        <ChevronDown size={16} className={`dropdown-arrow ${isAccountOpen ? "open" : ' '}`}/>
                    </button>
                    {isAccountOpen && (
                    <div className="dropdown-menu">
                        <a href="/profile" className="dropdown-item">
                            <User size={16}/>
                            <span>Profile</span>
                        </a>
                          <a href="/Login" className="dropdown-item">
                            <LogIn size={16}/>
                            <span>Login</span>
                        </a>
                          <a href="/Register" className="dropdown-item">
                            <UserPlus size={16}/>
                            <span>Register</span>
                        </a>
                          <a href="/Settings" className="dropdown-item">
                            <Settings size={16}/>
                            <span>Settings</span>
                        </a>
                    </div>
                    )}
                </div>

                {/* Help and its dropdown menu */}
                 <div className="dropdown">
                    <button className="Account-btn" 
                      onClick={() => setIsHelpOpen(!isHelpOpen)}
                      onBlur={() => setTimeout(() => setIsHelpOpen(false), 150)}
          >
                      <HelpCircle size={20} />
                      <span>Help</span>
                      <ChevronDown size={16} className={`dropdown-arrow ${isHelpOpen ? 'open' : ''}`} />
                    </button>
          
                    {isHelpOpen && (
                      <div className="dropdown-menu">
                        <a href="/contact" className="dropdown-item">
                          <MessageCircle size={16} />
                          <span>Contact Us</span>
                        </a>
                        <a href="/faq" className="dropdown-item">
                          <FileText size={16} />
                          <span>FAQ</span>
                        </a>
                        <a href="/about" className="dropdown-item">
                          <Info size={16} />
                          <span>About</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* cart */} 
                  <button className="Account-btn cart-btn">
                    <ShoppingCart size={20} 
                    />
                     {cartItemsCount > 0 && (
                      <span className="cart-badge">{cartItemsCount}</span>
                    )}
                    <span>Cart</span>
                   
                  </button>
                
            </div>

        </nav>
    )
}