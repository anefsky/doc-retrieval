import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Banner() {
  return (
    <div className="banner">
      <div className="contents">
        <a href='/'>
          <div className="left">
            <img className="logo" src="/images/delta-icon.png" alt=""/>
            <div className="title">Delta</div>
          </div>
        </a>
        <div className="right">
          <AccountCircleIcon />
          <div className="user-name">Andrew Nefsky</div>
        </div>
      </div>
    </div>
  )
}