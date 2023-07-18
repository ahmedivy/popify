import { FaPlay } from "react-icons/fa"

function PlayButton() {
  return (
    <button className="transition opacity-0 rounded-full bg-green-500 flex items-center p-4 drop-shadow-md translate-y-1/4 translate group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
        <FaPlay className="text-black"/>
    </button>
  )
}

export default PlayButton
