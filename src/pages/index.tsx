import Link from 'next/link'
export default function Page() {
  return (
    <div>
      <h6>Hello, Home!</h6>
      <Link href="/farming">go to farm</Link>
    </div>
  )
}