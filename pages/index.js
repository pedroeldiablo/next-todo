import Link from 'next/link';

export default function Index() {
    return (
      <div>
           <Link href="/todos" >
                <a title="ToDos">Todos</a>
            </Link>
        <p>Hello World</p>
      </div>
    );
  }
