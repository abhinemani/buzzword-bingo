import React, { useState } from 'react';
import { BiPencil, BiRefresh } from 'react-icons/bi';
import styled from 'styled-components';
import { Board } from './components/Board';
import { EditBuzzwordsModal } from './components/EditBuzzwordsModal';

const defaultBuzzwords = [
  'Digital Transformation', 'Cloud Solutions', 'Stakeholder Engagement', 'Procurement Efficiency', 'Budget Optimization', 'SaaS Integration', 'Grant Management', 'ERP Systems', 'Compliance Automation', 'Citizen-Centric Design', 'Public Sector Innovation', 'Workflow Efficiency', 'Data Analytics', 'Cybersecurity', 'User Experience', 'Agile Methodology', 'Strategic Partnerships', 'Resource Allocation', 'Operational Excellence', 'Sustainable Development', 'Transparent Governance', 'Mobile Accessibility', 'Financial Reporting', 'Capacity Building', 'Scalable Infrastructure', 'Cross-Functional Teams', 'Performance Metrics', 'Smart City Initiatives', 'Community Outreach', 'Legacy System Modernization'

];

const BuzzwordBingo = styled.div`
  min-height: 100vh;
  // use small viewport height if browser supported
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #281978;
`;

const Actions = styled.div`
  display: flex;
  justify-content: right;
  width: 80vmin;
  @media (max-width: 463px) {
    width: 95vmin;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4em;
  width: 4em;
  border: thin solid black;
  margin: 0.5em;
  border-radius: 5px;
  &:hover {
    scale: 1.05;
  }
  cursor: pointer;
`;

const RefreshButton = styled(ActionButton)`
  background-color: lightblue;
`;

const EditButton = styled(ActionButton)`
  background-color: yellow;
`;

const shuffle = (words) => {
  return words
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val)
    .slice(0, 24);
};

const App = () => {
  const [buzzwords, setBuzzwords] = useState(defaultBuzzwords);
  const [shuffledBuzzwords, setShuffledBuzzwords] = useState(
    shuffle(defaultBuzzwords)
  );
  const [editModalOpened, setEditModalOpened] = useState(false);

  const onEditClose = () => {
    setEditModalOpened(false);
  };

  const onEditSubmit = (customizedBuzzwords) => {
    setBuzzwords(customizedBuzzwords);
    setShuffledBuzzwords(shuffle(customizedBuzzwords));
    onEditClose();
  };

  return (
    <BuzzwordBingo>
      <h1>Buzzword Bingo</h1>
      <EditBuzzwordsModal
        buzzwords={buzzwords}
        opened={editModalOpened}
        onClose={onEditClose}
        onSubmit={onEditSubmit}
      />
      <Actions>
        <RefreshButton type="button">
          <BiRefresh
            size={'5em'}
            color="black"
            onClick={() => setShuffledBuzzwords(shuffle(buzzwords))}
          />
        </RefreshButton>
      </Actions>
      <Board buzzwords={shuffledBuzzwords}></Board>
    </BuzzwordBingo>
  );
};

export default App;
