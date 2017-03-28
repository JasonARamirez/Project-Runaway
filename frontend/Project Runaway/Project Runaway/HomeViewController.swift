//
//  ViewController.swift
//  Project Runaway
//
//  Created by Josh Gonzales-Neal on 2/24/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import MapKit
import GoogleMaps
import Alamofire

// MARK: -
// TODO: -
// FIXME: -

class HomeViewController: UIViewController {
    
    let userID = "a3a09cc2-6579-Ufc3-94b3-47699fba64d2"

    @IBOutlet weak var MapView: MKMapView!
    
    let regionRadius: CLLocationDistance = 1000
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let initialLocation = CLLocation(latitude: 42.030781, longitude: -93.631913)
        
        centerMapOnLocation(location: initialLocation)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func centerMapOnLocation(location: CLLocation) {
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(location.coordinate, regionRadius * 2.0, regionRadius * 2.0)
        MapView.setRegion(coordinateRegion, animated: true)
    }

    func getPath(location: CLLocation) -> Bool {
        return false
    }

    func callRoadTripChecker(userid: String, routeStart: Int, routeEnd: Int, startTime: Int) -> Bool {
        let parameters: Parameters = [
            "userID": userid,
            "start": [
                "lat" : routeStart,
                "long": routeStart
            ],
            "end": [
                "lat" : routeEnd,
                "long": routeEnd
            ],
            "startTime":startTime
        ]
        
        //Alamofire.request("https://project-runaway.herokuapp.com/", method: .post, parameters: parameters, encoding: encoding: JSONEncoding.default)
        return false
    }
}

