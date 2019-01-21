import React from 'react'
import fetch from 'isomorphic-fetch'

function InfiniteList(WrappedComponent) {
    return class InfiniteList extends React.Component {


        state = {
            data: [],
            page: 1,
            fetchedAllPages: false,
            scrolling: false,
            initFillComplete: false,
            noInfinite: this.props.params.noInfinite,
        };


        componentWillMount() {
            this.loadData();
            if (this.state.noInfinite) return;
            this.scrollListener = window.addEventListener('scroll', (e) => {
                this.handleScroll(e);
            })
        }

        componentWillReceiveProps(nextProps, nextContext) {
            if (nextProps.params.url !== this.props.params.url) this.loadNew();
        }

        loadNew = () => {
            this.setState(() => ({
                page: 1,
                data: [],
                fetchedAllPages: false,
                scrolling: false,
                initFillComplete: false,
            }), this.loadData)
        };

        loadMore = () => {
            this.setState(prevState => ({
                page: prevState.page + 1
            }), this.loadData)
        };

        handleScroll = () => {
            const {scrolling, fetchedAllPages} = this.state;
            if (scrolling) return;
            if (fetchedAllPages === true) return;
            const {pageOffset, elementOffset, bottomOffset} = this.calculatePageOffsets();
            if (pageOffset > elementOffset - bottomOffset) this.loadMore();
        };


        loadData = () => {
            let {data, page, fetchedAllPages} = this.state;
            if (fetchedAllPages) return;
            const url = this.props.params.url.replace("#pnum#", page);
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (!json || json.length === 0) fetchedAllPages = true;
                    this.setState(() => ({
                        fetchedAllPages: fetchedAllPages,
                        data: [...data, ...json]
                    }), this.checkInitFill);

                })
        };

        calculatePageOffsets = () => {
            const element = document.querySelector('div.' + this.props.params.selectorClass + ' > div:last-child');
            if (!element) return {pageOffset: 0, elementOffset: 0, bottomOffset: 0};
            const eO = element.offsetTop + element.clientHeight;
            const pO = window.pageYOffset + window.innerHeight;
            var bO = 50;
            return {pageOffset: pO, elementOffset: eO, bottomOffset: bO}
        };

        checkInitFill = () => {
            if (this.state.initFillComplete || this.state.noInfinite) return;
            const {pageOffset, elementOffset} = this.calculatePageOffsets();
            if (pageOffset > elementOffset) this.loadMore(); else this.setState({initFillComplete: true})
        };


        render() {
            return (
                <div
                    className={this.props.params.selectorClass + " row "}>
                    {this.state.data.map(item => (
                        <WrappedComponent key={this.props.params.selectorClass.concat(item.id)}
                                          beer={item} {...this.props}/>))}
                </div>)
        }

    }
}


export default InfiniteList
