import * as angular from 'angular';

describe(`ng-infinite-autocomplete Wrapper Unit Testing`, function() {

    var InfiniteAutocompleteCore, $compile, element, $scope;

    beforeEach(angular.mock.module('infinite-autocomplete'));
    
    beforeEach(angular.mock.module(($provide:ng.auto.IProvideService) => {
		InfiniteAutocompleteCore = jasmine.createSpy('InfiniteAutocompleteCore');
        InfiniteAutocompleteCore.prototype.setConfig = jasmine.createSpy('setConfig');
		$provide.constant('InfiniteAutocompleteCore', InfiniteAutocompleteCore);
	}));

    beforeEach(inject(($injector) => {
        $scope = $injector.get(`$rootScope`).$new();
        $compile = $injector.get(`$compile`);
    }));

    describe(`Data feature support`, function() {

        it(`should pass the data into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            element = $compile('<ng-infinite-autocomplete data="data"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });
        });

        
        it(`should call CORE.setConfig whenever the data changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            
            element = $compile('<ng-infinite-autocomplete data="data"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });
            
            //Push new item to the static data array
            $scope.data.push({
                text: 'text2', value: 'value2'
            });

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [
                        { text: 'text', value: 'value' },
                        { text: 'text2', value: 'value2' }
                    ]
                });
        });


    });

    describe(`fetchSize feature support`, function() {

        it(`should pass the fetchSize into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.chunkSize = 6;
            element = $compile('<ng-infinite-autocomplete data="data" fetch-size="chunkSize"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });
        });

        
        it(`should call CORE.setConfig whenever the fetchSize changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.fetchSize = 6;
            
            element = $compile('<ng-infinite-autocomplete data="data" fetch-size="fetchSize"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });
            
            //Push new item to the static data array
            $scope.fetchSize = 10;

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 10
                });
        });


    });


    describe(`maxHeight feature support`, function() {

        it(`should pass the maxHeight into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.chunkSize = 6;
            $scope.maxHeight = '160px';
            element = $compile(`<ng-infinite-autocomplete data="data"
                                                          fetch-size="chunkSize"
                                                          max-height="maxHeight">
                                    </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: '160px'
                });
        });

        
        it(`should call CORE.setConfig whenever the maxHeight changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.fetchSize = 6;
            $scope.maxHeight = 150;
            
            element = $compile(`<ng-infinite-autocomplete data="data"
                                                          fetch-size="fetchSize"
                                                          max-height="maxHeight">
                                        </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: 150
                });
            
            $scope.maxHeight = 200;

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: 200
                });
        });

    });


    describe(`onSelect feature support`, function() {

            it(`should pass the function to the CORE.setConfig whenever we choose something`, function() {
                $scope.onSelectHandler = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                on-select="onSelectHandler($element, $data)">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        onSelect: jasmine.any(Function)
                    });

            });

    });


    describe(`getDataFromApi feature support`, function() {
        
        it(`should pass the function to CORE.setConfig`, function() {
            $scope.getDataFromApi = (...args) => {}

            element = $compile(`<ng-infinite-autocomplete
                                            get-data-from-api="getDataFromApi($text, $page, $fetchSize)">
                                </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();
            
            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    getDataFromApi: jasmine.any(Function)
                });

            $scope.getDataFromApi();
            
        });

    });

});
