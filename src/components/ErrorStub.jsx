import NetworkError from '../errors/NetworkError';
import NetworkErrorStub from './NetworkErrorStub';
import UncaughtErrorStub from './UncaughtErrorStub';

export default function ErrorStub(props) {
  const { error } = props;
  switch (true) {
    case error instanceof NetworkError:
      return <NetworkErrorStub />;
    default:
      return <UncaughtErrorStub />;
  }
}
