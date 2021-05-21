import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { createStructuredSelector } from "reselect";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { fetchCollectionsStart, fetchCollectionsStartAsync, updateCollections } from "../../redux/shop/shop.actions";
import { selectIsCollectionsLoaded, selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionPage from "../collection/collection.component";

const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component{

    // state = {
    //     isLoading: true
    // }
    // unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {fetchCollectionsStart} = this.props
        fetchCollectionsStart()
        // fetchCollectionsStartAsync()
        // const collectionRef = firestore.collection('collections')

        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateCollections(collectionsMap)
        //     this.setState({isLoading: false})
        // })
    }

    render(){
        const {match, isCollectionsLoaded} = this.props
        // const {isLoading} = this.state
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route exact path={`${match.path}/:collectionId`} render={
                    (props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                }/>
            </div>
            )
    }

    componentWillUnmount() {
        // this.unsubscribeFromSnapshot()
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
    // updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
    // this one is for async
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)