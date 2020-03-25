import Link from 'next/link';
import styled from 'styled-components'

const Plink = styled.a`
background-color: pink;
display: flex;
color: green;

`

export default function Index() {
    return (
      <div>
           <Link href="/todos" >
                <Plink title="ToDos">Todos</Plink>
            </Link>
            <Link href="/whatNext" >
                <a title="what to do next">What nexts</a>
            </Link>
        <p>Hello World</p>
      </div>
    );
  }
