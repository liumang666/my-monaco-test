import { Link, Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 20px',
        }}
      >
        <Link to="/">首页</Link>
        <Link to="/editor">编辑</Link>
        <Link to="/about">编辑对比</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
export default Layout
