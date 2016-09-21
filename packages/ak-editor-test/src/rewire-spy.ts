export default () => {
  const resetAfter: any[] = [];

  afterEach(() => resetAfter.map(({ module, name }) => module.__ResetDependency__(name)));

  return (module: any, name: string) => {
    const func = module.__GetDependency__(name);
    const spy = sinon.spy(func);
    module.__Rewire__(name, spy);
    resetAfter.push({ module, name });
    return spy;
  }
};
