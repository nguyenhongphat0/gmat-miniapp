import { ButtonHTMLAttributes, FunctionComponent, useEffect, useState } from "react";
import { useSpring, animated, AnimatedComponent } from "react-spring";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  large?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | ((e: React.MouseEvent<HTMLElement>) => Promise<void>);
}


const Button: AnimatedComponent<FunctionComponent<ButtonProps>> = animated(({ className, large, loading, children, onClick, style, ...props }) => {
  const [clickLoading, setLoading] = useState(false);
  const { angle } = useSpring({
    from: {
      angle: 0
    },
    to: {
      angle: 3600
    },
    loop: true,
    config: {
      easing: (t: number) => t,
      duration: 3000,
    }
  })

  return <animated.button
    type="button"
    className={`border-2 border-secondary rounded-xl leading py-4 px-8 active:bg-secondary flex justify-center items-center ${large ? `text-xl font-bold` : ''} ${className}`}
    style={{ background: loading || clickLoading ? angle.to(a => `linear-gradient(${a}deg, #06b6d4, #1d4ed8)`) : '', ...(style ?? {}) }}
    onClick={e => {
      if (onClick) {
        const result = onClick(e);
        if (result instanceof Promise) {
          setLoading(true);
          result.finally(() => setLoading(false));
        }
      }
    }}
    disabled={loading || clickLoading}
    {...props}>
    {children}
  </animated.button>
})

export default Button;