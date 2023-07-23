import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import Container from './App.styled';
import { useState } from 'react';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce(
      (total, stateValue) => total + stateValue,
      0
    );
  };
  const countPositiveFeedbackPercentage = () => {
    return ((good * 100) / countTotalFeedback()).toFixed(2);
  };

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good': {
        setGood(good => good + 1);
        break;
      }
      case 'neutral': {
        setNeutral(neutral => neutral + 1);
        break;
      }
      case 'bad': {
        setBad(bad => bad + 1);
        break;
      }
      default: {
        return;
      }
    }
  };
  return (
    <Container>
      <Section
        title="Please leave a feedback"
        fontWeight="600"
        marginBottom="10px"
      >
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics" fontWeight="100">
        {Boolean(countTotalFeedback()) ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
}
