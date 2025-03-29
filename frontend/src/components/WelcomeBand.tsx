function WelcomeBand() {
  return (
    <>
      {/* Bootstrap Grid Setup */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center bg-primary text-white p-4 rounded-pill bg-gradient">
            {/* #notcoveredinthevideos:
              - 'rounded-pill': Gives the heading a pill-shaped background.
              - 'bg-gradient': Adds a subtle gradient to the background.
            */}
            <h1>Books</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeBand;
