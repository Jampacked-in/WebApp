import { Button } from "../ui/button"

const LeftSidebar = () => {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-5">
        <Button className="shad-button_ghost">Dashboards</Button>
        <Button className="shad-button_ghost">Connections</Button>
      </div>
    </nav>
  )
}

export default LeftSidebar