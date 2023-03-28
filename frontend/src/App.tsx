import { ReactElement } from 'react';
import styled from 'styled-components';
import { ActivateDeactivate } from './components/ActivateDeactivate';
import { DeployContract } from './components/DeployContract';
// import { LookUpContract } from './components/LookUp';
import { Bid } from './components/Bid';
import { SectionDivider } from './components/SectionDivider';
import { WalletStatus } from './components/WalletStatus';

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 20px;
`;

export function App(): ReactElement {
  return (
    <StyledAppDiv>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <DeployContract />
      <SectionDivider />
      {/* <LookUpContract /> */}
      <SectionDivider />
      <Bid />
    </StyledAppDiv>
  );
}
