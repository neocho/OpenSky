export default function Footer() {
  return (
    <div className="flex flex-col w-full h-36 border-t bg-black items-start pl-10 justify-center space-y-2">
      <h1 className="text-white font-bold text-xs leading-loose">
        OpenSky 2021
      </h1>
      <div className="flex flex-row space-x-8 items-center">
        <a href="https://blockblock.io" target="_blank" rel="noreferrer">
          <img alt="" src="/blockblock.svg" width="100px" />
        </a>
      </div>
    </div>
  );
}
