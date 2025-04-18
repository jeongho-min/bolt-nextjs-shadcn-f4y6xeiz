import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
  return <div className={cn("loader", className)} {...props} />;
}

// CSS 스타일을 전역 CSS 파일에 추가해야 합니다.
// app/globals.css에 아래 스타일을 추가해주세요:
/*
.loader {
  height: 15px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
  background: 
    var(--_g) left, 
    var(--_g) right;
  background-size: 25% 100%;
  display: flex;
}
.loader:before{
  content: "";
  flex: 1;
  background: inherit;
  animation: l50 2s infinite;
}
@keyframes l50 {
  0%    {transform: translate( 37.5%) rotate(0)     }
  16.67%{transform: translate( 37.5%) rotate(90deg) }
  33.33%{transform: translate(-37.5%) rotate(90deg) }
  50%   {transform: translate(-37.5%) rotate(180deg)}
  66.67%{transform: translate(-37.5%) rotate(270deg)}
  83.33%{transform: translate( 37.5%) rotate(270deg)}
  100%  {transform: translate( 37.5%) rotate(360deg)}
}
*/
